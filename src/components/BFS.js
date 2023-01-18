import { useEffect } from "react";

 function BFS() {
    const graph = {
        A: ["B", "C"],
        B: ["A", "D", "E"],
        C: ["A", "F", "G"],
        D: ["B", "H", "I"],
        E: ["B", "J"],
        F: ["C"],
        G: ["C", "K"],
        H: ["D"],
        I: ["D"],
        J: ["E"],
        K: ["G"],
    };
    
    const bfs = (graph, startNode) => {
        const visited = [];
        let needVisit = [];
    
        needVisit.push(startNode);
        while(needVisit.length !== 0){
            const node = needVisit.shift(); // queue의 선입선출로 shift() 사용
            console.log(needVisit,"쉬프트 한 배열값")
            if(!visited.includes(node)){
                visited.push(node);
                needVisit = [...needVisit, ...graph[node]];
            }
        }
    
        return visited;
    }

    useEffect(() => {
        console.log(bfs(graph, "A"));
    }, []);

    return(
        <>

        </>
    )
 }
export default BFS;