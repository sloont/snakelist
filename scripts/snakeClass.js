class Node {
    constructor(coord, next = null, prev = null) {
        this.coord = coord;
        this.next = next;
        this.prev = prev;
    }

    getCoord = () => {
        return this.coord;
    }
}

class Snake {
    constructor () {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }


    ///////////push//////////////

    push = (coord) => {           
       const newNode = new Node(coord);

        //if empty list newNode is head and tail
        if (this.size === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }

        this.size++;
        //return the node added to the end
        return newNode
    }

    /////////////unshift////////////
    unshift = (coord) => {          
        const newNode = new Node(coord);

        if (this.size === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }

        this.size++;
        //return the node added to the beginning
        
        return newNode;
    }

    insertAt (coord, index) {
        if (index < 0 || index > this.size) {
            console.log("invalid index");
            return null;
        }

        if (index === 0) {
            return this.unshift(coord);
        }

        if (index === this.size) {
            return this.push(coord);
        }

        const newNode = new Node (coord);
        let current, previous;

        current = this.head;
        let count = 0;

        while (count < index) {
            previous = current;
            count++;
            current = current.next;
        }

        newNode.next = current;
        newNode.prev = previous;
        previous.next = newNode;
        current.prev = newNode;

        this.size++;

        return newNode;
    }

    coordAt = (index) => {
        if (index >= this.size || index < 0) {
            console.log("invalid index");
            return null;
        }
        
        let current = this.head;
        let count = 0;

        while (current) {
            if (count == index) {
                return current.coord;
            }

            count++;
            current = current.next;
        }
    }

    ////////////////pop////////////////////

    pop = () => {
        let temp = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
        this.size--;
        return temp;    ///for now lets return the node we popped off
    }

    ///////////////shift//////////////////

    shift = () => {
        let temp = this.head;
        this.head = this.head.next;
        this.head.prev = null;
        this.size--;
        return temp;   ////for now lets return the node we shifted
    }

    removeAt = (index) => { 
        if (index >= this.size || index < 0) {
            console.log("invalid index");
            return null;
        }

        let current = this.head;
        let previous, count = 0;

        if (index === 0) {
            return this.shift();
        } 
        if (index === this.size -1) {
            return this.pop();
        }

        while (count < index) {
            count++;
            previous = current;
            current = current.next;
        }
        
        previous.next = current.next;
        current.next.prev = previous;
        
        this.size--;
        return current;
    }

    clearList = () => {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    printList = () => {
        let current = this.head;

        if (this.size === 0) {
            console.log("empty list");
            return null;
        }

        while (current) {
            console.log(current.coord);
            current = current.next;
        }
    }

}

//////TESTING///////////////////////////////////////////////
const snake = new Snake;


