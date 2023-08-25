// defining the Note datatype here
type Note = {
  _id: string;
  noteText: string;
  createdAt: string;
  isStared: boolean;
  category: string;
  bgColor: string;
};

// defining the add/update result datatype here
type Result = {
  status: 'success' | 'error',
  body: Note,
}

// defining the delete result datatype here
type DeleteResult = {
  status: 'success' | 'error',
  body: Partial<Note>,
}
