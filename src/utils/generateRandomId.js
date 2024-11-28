import { Card } from "./Card"

export const genrateRandomId = (id) => {
    const newArr = Card.filter(item => item.id !== id)

    const index = Math.floor(Math.random() * newArr.length)

    return newArr[index].id
}