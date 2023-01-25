# 지뢰찾기 게임 Rule
> 플레이 목표는 **지뢰**가 없는 블록을 모두 클릭하면 된다.
> 
1. 게임을 시작하고 아무 블록이나 누르면 숫자가 나타난다.
2. 만약 클릭한 블록 주변에 지뢰가 하나도 존재하지 않는다면 그 블록에는 숫자가 나타나지 않으며, 지뢰가 없는 인접한 블록들이 자동으로 열리게 된다.
3. 숫자는 그 블록을 중심으로 한  3X3 영역에 몇 개의 지뢰가 존재하는 가를 나타낸다.
4. 이렇게 나타나는 숫자들을 가지고 인접한 8칸에 숨어 있는 지뢰를 우클릭해서 깃발을 꽂아야 한다. **지뢰를 클릭하면 게임 Over.** 그 칸을 포함해 모든 지뢰의 위치가 드러난다.
5. 마우스 **좌클릭 한번**으로 한 칸 열기, **우클릭 한번**은 깃발 꽂기.

   **[여기](https://choi-ik.github.io/js_minesweeper/) 를 클릭하여 게임 실행**
<br>
<br>

# 📌 사용 기술
- **JavaScript**
- **React.js**
- **Redux-Toolkit**
- **TailwindCSS**
<br>
<br>

# 📂 파일 구조

**|— src** 

    |— Main.js

**|—|— Components**

        |— MineCount.js

        |— StartBtn.js

        |— Success.js

        |— Timer.js

        |— GameBoard.js

        |— Cell.js

**|—|— Redux**

    |—|— Store

        |— Store.js

    |—|— Slice

        |— gameBoardSlice.js

        |— mineSlice.js

        |— startBtnSlice.js

        |— timerSlice.js

**|—|— Utils**

    |— cellTextColor.js
<br>

# ✅ 목표 기능
- **9 X 9  2차원 배열 게임보드 구현**

    - 닫혀있는 블록 좌클릭.

        - 지뢰인 경우 지뢰가 표시 및 게임 종료.

        - 지뢰가 아닌 경우 해당 블록에 인접한 지뢰 중 지뢰가 있는 만큼 숫자 표시(숫자마다 다른 색상 적용)

        - 주변에 지뢰가 없는 경우 DFS 알고리즘을 이용하여 주변 블록 탐색 후 지뢰가 없는 블록들 열어주기.

    - 닫혀있는 블록 우클릭.

        - 깃발을 표시하고 남은 깃발 개수 감소.

        - 남은 깃발이 0인 경우 깃발 꽂을 수 없음.

        - 깃발이 있는 곳 다시 우클릭 시 깃발 개수 증가.

- **게임 시작 버튼 구현**

    - 게임 버튼 클릭 시 게임 보드 블록 클릭 가능.

    - 게임 실패 시 버튼 텍스트 변경 및 게임 보드 클릭 불가능.

    - 게임 성공 시 버튼 텍스트 변경

- **타이머 구현**

    - 게임 시작 버튼 클릭 시 타이머 시작.

    - 게임을 실패하거나, 성공하면 타이머 멈춤.

- **게임 성공 이모지 구현**

    - 게임 진행 및 성공 시 이모지 변경.

- **지뢰 개수 입력 구현**

    - 보드 상단에 지뢰 개수(Limit = 30) 입력, 지뢰 개수에 맞게 게임 보드에 랜덤으로 지뢰 뿌리기
<br>
<br>

# 📌 필수 기능 구현
### 지뢰찾기 보드 구현

- 2차원 배열을 이용해 기본 값으로 9 X 9 크기를 가진 보드 생성

- 첫 번째 줄의 첫 칸(0, 0) 마지막 줄의 마지막 칸(8,8) 가짐.

- 9X9 크기의 보드에 행과 열의 0~8 사이의 랜덤 숫자 2개 뽑아 지뢰 배분(랜덤 숫자 중복 X).

- 지뢰가 다 배치되고 블록을 클릭했을

- 때 아래 그림처럼 양 사방 블록에 들어있는 지뢰의 숫자를 세고 그 숫자 표시.


<p align="center">
    <img src="https://user-images.githubusercontent.com/91654577/214491041-b781235a-3793-4696-80f4-a2dadf0faade.png"/>
</p>

- 빈 블록을 클릭했을 때 주변 모든 지뢰가 없는 블록을 연쇄적으로 열람하기 위해 DFS 알고리즘(재귀 호출)을 사용해 주변 블록 탐색

    - 주변에 지뢰가 없는 (블록의 숫자가 0인) 블록들을 모두 Open 해버린다.
<br>
<br>
# ✅ Redux 상태 관리

- **gameBoardSlice**

    - 게임 보드의 행,열의 길이

    - 2차원 게임 보드(각 행과열에 Object로 블록의 주변 지뢰 개수, Open 여부, 깃발 여부 생성)

    - 블록의 Open 여부

    - 지뢰 상태

    - 깃발 상태

    - 깃발 개수

    - 블록 클릭 활성화 및 비활성화

    - 방문한 블록의 2차원 배열

    - **Reducers**
        - 2차원 게임 보드 초기화

        - 게임 보드에 랜덤으로 지뢰 세팅

        - 블록의 클릭 상태 변경

        - 블록의 Open 여부 변경

        - 블록의 깃발 Open 여부 변경

        - 깃발의 개수 입력

        - 깃발의 개수 증가

        - 깃발의 개수 감소

        - DFS 알고리즘 이용해 주변 블록 열람

        - 주변 지뢰 개수 확인

- **mineSlice**

    - 지뢰의 개수

    - **Reducers**

        - 지뢰 개수 변경

- **startBtnSlice**

    - 시작 버튼의 true / false

    - 버튼의 Text

    - **Reducers**

        - 버튼의 true/false 값 변경

        - 버튼의 Text 변경

- **Timer**

    - 타이머의 true / false

    - 타이머 초기화 값
    
    - **Reducers**

        - 타이머의 true/false 값 변경

        - 타이머 값 변경

<br>
<br>

# ✅ 프로젝트 목업
<p align="center">
    <img width="600px" height="600px" src="https://user-images.githubusercontent.com/91654577/214491413-ccd31483-a22b-42e1-aa4d-488e93790893.png"/>
</p>
<br>
<br>

# ✅ 실행화면
<p align="center">
    <img width="700px" src="https://user-images.githubusercontent.com/91654577/214492006-8a4c8b6f-a28d-4ddf-b70f-4c7d49d5eda4.png"/>
    <img width="550px" src="https://user-images.githubusercontent.com/91654577/214492014-16daf122-0008-49c3-9b2f-ab0671a1ac1c.png" />
</p>



    