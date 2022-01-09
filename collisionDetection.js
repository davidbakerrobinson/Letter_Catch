export function detectCollision(otherObject, gameObject, isLetter = true, game) {
    let collision = false;
    let bottomOfObj;
    let topOfObj;
    if(isLetter === true) {
        bottomOfObj = otherObject.position.y;
        topOfObj = otherObject.position.y - otherObject.letter_height;
        //console.log(otherObject.letter_height);
    }
    else {
        bottomOfObj = otherObject.position.y + otherObject.height;
        topOfObj = otherObject.position.y;
    }
    let topOfObject = gameObject.position.y;
    let leftSideObject = gameObject.position.x;
    let rightSideObject = gameObject.position.x + gameObject.width;
    let bottomOfObject = gameObject.position.y + gameObject.height;
// console.log(bottomOfObject >= topOfObj);
// console.log(bottomOfObject);
// console.log(topOfObj)

    if (bottomOfObj >= topOfObject &&
        bottomOfObject >= topOfObj &&
        leftSideObject <= otherObject.position.x &&
        rightSideObject >= otherObject.position.x) {
        collision = true;
    }
    return collision;
}