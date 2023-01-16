export const getCellTextColor = (mineCount) => {
    switch(mineCount) {
        case 1:
            return "black";
        case 2:
            return "yellow-300";
        case 3: 
            return "blue-700";
        case 4:
            return "red-500";
        case 5:
            return "indigo-700";
        case 6:
            return "purple-600";
        case 7:
            return "pink-300";
        case 8:
            return "pink-900";
        default: 
            return "white";
    }
};

export const getCellBackgroundColor = (isMine) => {
    switch(isMine) {
        case "💣":
            return 
    }
}