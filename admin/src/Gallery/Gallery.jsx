import { useEffect, useState } from "react";
import { Trash2, Eye, PenBoxIcon, AlertCircle, Plus } from "lucide-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import AddGalleryModal from "./Add";
import ViewGalleryModal from "./View";
import EditGalleryModal from "./Edit";
import { deleteImage, getAllImages } from "../context/GalleryContext";
import TruncateText from "../components/TruncateText";

const Gallery = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    const data = await getAllImages();
    setImage(data);
    setLoading(false);
  };

  const refreshData = () => {
    fetchImages();
  };

  const handleViewImage = (event) => {
    setCurrentImage(event);
    setIsViewDialogOpen(true);
  };

  const handleEditImage = (event) => {
    setCurrentImage(event);
    setIsEditDialogOpen(true);
  };

  const handleDeleteImage = (image) => {
    confirmDialog({
      message: `Are you sure you want to delete "${image._id}" ?`,
      header: "Confirm Deletion",
      icon: <AlertCircle size={30} />,
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-secondary",
      accept: async () => {
        await deleteImage(image._id);
        fetchImages();
        console.log(`Image Deleted: \n`, image._id);
      },
      reject: () => {
        console.log("Delete action canceled");
      },
    });
  };

  const actionTemplate = (rowData) => (
    <div className='flex gap-1'>
      <Button
        icon={<Eye />}
        className='p-button-text p-button-info'
        onClick={() => handleViewImage(rowData)}
        tooltip='View'
      />
      <Button
        icon={<PenBoxIcon />}
        className='p-button-text p-button-warning'
        onClick={() => handleEditImage(rowData)}
        tooltip='Edit'
      />
      <Button
        icon={<Trash2 />}
        className='p-button-text p-button-danger'
        onClick={() => handleDeleteImage(rowData)}
        tooltip='Delete'
      />
    </div>
  );

  const descriptionTemplate = (rowData) => (
    <TruncateText text={rowData.description} maxLength={30} />
  );

  return (
    <section className='p-6 space-y-6 max-w-7xl'>
      <div className='flex justify-between items-center bg-white p-4 rounded-lg border border-neutral-200/60'>
        <div>
          <h1 className='text-2xl font-bold text-neutral-800'>Gallery</h1>
          <p className='text-neutral-500'>Manage and organize gallery images</p>
        </div>
        <Button
          icon={<Plus />}
          label={"Add Gallery Images"}
          className='p-button-success space-x-2'
          onClick={() => setIsAddDialogOpen(true)}
        />
      </div>

      <div className='bg-white border border-neutral-200/30 rounded-md overflow-hidden'>
        <DataTable
          value={image}
          paginator
          rows={10}
          loading={loading}
          emptyMessage='No Images Found.'
          responsiveLayout='scroll'>
          <Column
            header='S.NO'
            body={(rowData, { rowIndex }) => rowIndex + 1}
            style={{ textAlign: "center" }}
          />
          <Column
            field='imageUrl'
            header='IMAGE'
            body={(rowData) => (
              <img
                src={rowData.imageUrl}
                alt={rowData.imageUrl}
                className='w-24 h-16 rounded-md border border-neutral-300'
              />
            )}
          />
          <Column
            field='description'
            header='DESCRIPTION'
            body={descriptionTemplate}
          />
          <Column header='ACTIONS' body={actionTemplate} />
        </DataTable>
      </div>

      <AddGalleryModal
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        refreshData={refreshData}
      />
      <ViewGalleryModal
        isOpen={isViewDialogOpen}
        onClose={(e) => {
          e.preventDefault(), setIsViewDialogOpen(false);
        }}
        selectedImage={currentImage}
      />
      <EditGalleryModal
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        selectedImage={currentImage}
        refreshData={refreshData}
      />

      <ConfirmDialog />
    </section>
  );
};

export default Gallery;
