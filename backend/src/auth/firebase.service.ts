import * as admin from 'firebase-admin';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    admin.initializeApp({
      credential: admin.credential.cert(require('C:\\Users\\Dell\\Desktop\\Thapar Website\\TPC-Website\\backend\\src\\auth\\1.json')),
    });
  }

  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return admin.auth().verifyIdToken(token);
  }

  async createUser(email: string, password: string): Promise<admin.auth.UserRecord> {
    return admin.auth().createUser({ email, password });
  }

  async sendVerificationEmail(uid: string): Promise<void> {
    const user = await admin.auth().getUser(uid);
    const verificationLink = await admin.auth().generateEmailVerificationLink(user.email);

    // Send the email using Firebase or any mail service
    // You can use nodemailer or any email provider here to send `verificationLink` to the user
    console.log(`Verification link sent: ${verificationLink}`);
  }
}
