class Card {
  constructor(id, listId, title = "New Card", lastEdited) {
    this.id = id;
    this.listId = listId;
    this.title = title;
    this.lastEdited = lastEdited;
  }
}

export default Card;
