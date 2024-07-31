import React from 'react';

const Popup = ({ message, onConfirm, onCancel, type }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold mb-4">{message}</h2>
                <div className="flex justify-end">
                    {type === 'confirm' && (
                        <>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition duration-150"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-150"
                                onClick={onConfirm}
                            >
                                Confirm
                            </button>
                        </>
                    )}
                    {type === 'ok' && (
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-150"
                            onClick={onConfirm}
                        >
                            OK
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Popup;
