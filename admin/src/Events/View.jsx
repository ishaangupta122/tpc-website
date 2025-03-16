import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";

const EditEventsModal = ({ isOpen, onClose, selectedEvent }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    date: "",
    category: "",
  });

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent.title || "",
        image: selectedEvent.image || "",
        description: selectedEvent.description || "",
        date: selectedEvent.date || "",
        category: selectedEvent.category || "",
      });
    }
  }, [selectedEvent]);

  return (
    <Dialog
      header={"View Event"}
      visible={isOpen}
      onHide={onClose}
      style={{ width: "50vw" }}>
      <form className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Event Title
          </label>
          <InputText
            name='title'
            value={formData.title}
            readOnly
            className='w-full p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Image
          </label>
          <div className='h-48 w-1/2 mb-4'>
            <img
              src={formData.image}
              alt={formData.image}
              className='h-full w-full border border-neutral-300 object-cover rounded-md'
            />
          </div>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <InputTextarea
            name='description'
            value={formData.description}
            rows={5}
            cols={50}
            readOnly
            className='w-full p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Date
          </label>
          <InputText
            name='date'
            type='date'
            value={formData.date}
            readOnly
            className='w-full p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Category
          </label>
          <InputText
            name='category'
            value={formData.category}
            readOnly
            placeholder='Select Category'
            className='w-full p-2'
          />
        </div>
        <div className='flex justify-end gap-3'>
          <Button
            label='Cancel'
            className='p-button-danger'
            onClick={onClose}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default EditEventsModal;
