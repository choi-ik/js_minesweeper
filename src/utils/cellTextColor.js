export const getCellTextColor = (mineCount) => {
    switch(mineCount) {
        case 1:
            return "text-black";
        case 2:
            return "text-yellow-300";
        case 3: 
            return "text-blue-700";
        case 4:
            return "text-red-500";
        case 5:
            return "text-indigo-700";
        case 6:
            return "text-purple-600";
        case 7:
            return "text-pink-300";
        case 8:
            return "text-pink-900";
        default: 
            return "text-white";
    }
};

export const getCellBackgroundColor = (isMine) => {
    switch(isMine) {
        case "💣":
            return "gray-800"
        default:
            return "green-600"
    }
}