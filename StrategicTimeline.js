import React, { useState } from 'react';
import Modal from 'react-modal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const StrategicTimeline = () => {
    const [items, setItems] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newItem, setNewItem] = useState({ date: '', description: '' });

    const handleDrop = (result) => {
        if (!result.destination) return;
        const reorderedItems = Array.from(items);
        const [removed] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, removed);
        setItems(reorderedItems);
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const addItem = () => {
        setItems([...items, newItem]);
        setNewItem({ date: '', description: '' });
        closeModal();
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(items, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileName = 'strategic-timeline.json';
        const link = document.createElement('a');
        link.setAttribute('href', dataUri);
        link.setAttribute('download', exportFileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const importedData = JSON.parse(event.target.result);
            setItems(importedData);
        };
        reader.readAsText(file);
    };

    return (
        <div className="timeline-container">
            <h1>Strategic Timeline</h1>
            <button onClick={openModal}>Add New Item</button>
            <button onClick={handleExport}>Export Timeline</button>
            <input type="file" onChange={handleImport} />
            <DragDropContext onDragEnd={handleDrop}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <ul className="timeline" {...provided.droppableProps} ref={provided.innerRef}>
                            {items.map((item, index) => (
                                <Draggable key={index} draggableId={index.toString()} index={index}>
                                    {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <span>{item.date}: {item.description}</span>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <h2>Add a New Item</h2>
                <input type="date" name="date" value={newItem.date} onChange={handleInputChange} />
                <input type="text" name="description" value={newItem.description} onChange={handleInputChange} placeholder="Description" />
                <button onClick={addItem}>Add Item</button>
                <button onClick={closeModal}>Cancel</button>
            </Modal>
        </div>
    );
};

export default StrategicTimeline;