import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FirebaseService } from './firebase.service';
import { CreateUserDto } from '../schemas/users/create-user.dto';
import { LoginDto } from '../schemas/auth/login.dto';
import { User } from '../schemas/users/user.schema';
import * as admin from 'firebase-admin';
import * as bcrypt from 'bcrypt';
import { createResponse } from '../utils/response/response.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    try {
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      const firebaseUser = await this.firebaseService.createUser(email, password);

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new this.userModel({
        name,
        email,
        password: hashedPassword,
        firebaseUid: firebaseUser.uid,
      });

      const savedUser = await user.save();

      await this.firebaseService.sendVerificationEmail(firebaseUser.uid);

      return createResponse(201, 'success', savedUser);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.log(error)
      throw new InternalServerErrorException(
        createResponse(500, 'error', 'Failed to sign up user'),
      );
    }
  }

async login(loginDto: LoginDto) {
  const { email, password } = loginDto;

  try {
    //console.log(`Login attempt for email: ${email}`);
    const trimmedEmail = email.trim().toLowerCase();

    //console.log('Fetching all users from database...');
    const allUsers = await this.userModel.find(); // Fetch all users
    //console.log(`Total users fetched: ${allUsers.length}`);

    //console.log(`Searching for user with email: ${trimmedEmail}`);
    const user = allUsers.find((user) => user.email === trimmedEmail); // Find user from allUsers
    //console.log('User found:', user);

    if (!user) {
      console.error(`No user found with email: ${trimmedEmail}`);
      throw new UnauthorizedException(
        createResponse(401, 'error', 'Invalid email or password'),
      );
    }

   // console.log('Comparing passwords...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
 //   console.log(`Passwords comparison result: ${isPasswordValid}`);

    if (!isPasswordValid) {
      console.error('Password mismatch');
      throw new UnauthorizedException(
        createResponse(401, 'error', 'Invalid email or password'),
      );
    }

   // console.log('Generating JWT token...');
    const token = this.jwtService.sign(
      { userId: user._id, username: user.email },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );
//    console.log(`Token generated: ${token}`);

    return createResponse(200, 'success', { token });
  } catch (error) {
    console.error('Login error:', error.message || error);
    throw new UnauthorizedException(
      createResponse(401, 'error', 'Invalid email or password'),
    );
  }
}

  

  async verifyEmail(token: string) {
    try {
      const decoded = this.jwtService.decode(token); 
      console.log(decoded.username)
      const { username } = decoded;

      const user = await this.userModel.findOne({email: username });
      if (!user) {
        return createResponse(404, 'error', 'User not found');
      }
      try{
      const firebaseUser = await admin.auth().getUserByEmail(username);
       if (!firebaseUser.emailVerified) {
        return { message: 'Email successfully verified', user };
      }
      }catch(error)
      {
        return createResponse(400, 'error', error);
      }

      // Check if email is verified
      // if (!firebaseUser.emailVerified) {
      //   throw new BadRequestException('Email not verified');
      // }
    
      // Update the user record in the database
      user.verified = true;
      await user.save();
    
      return { message: 'Email successfully verified', user };
    } catch (error) {
      return createResponse(400, 'error', error);
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new BadRequestException('User with this email does not exist');
      }

      // Send password reset email using Firebase
      await admin.auth().generatePasswordResetLink(email);
      
      return createResponse(200, 'success', 'Password reset email sent successfully');
    } catch (error) {
      console.error('Error in forgotPassword:', error);
      throw new InternalServerErrorException(
        createResponse(500, 'error', 'Failed to send password reset email'),
      );
    }
  }
}
