// utils/cleanUp.js
import fs from 'fs';

const cleanUpTicket = (ticketPath) => {
  fs.unlink(ticketPath, (err) => {
    if (err) {
      console.error('Error deleting ticket file:', err);
    } else {
      console.log('Ticket file deleted successfully');
    }
  });
};

export { cleanUpTicket };
