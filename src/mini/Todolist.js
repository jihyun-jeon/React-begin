import { useState } from "react";
import styles from "./Button.module.css";

function Todolist() {
  // input값 받는 state
  const [toDo, setToDo] = useState("");

  // input값 배열로 저장하는 state
  const [toDos, setToDos] = useState([]); //todo들을 배열에 넣기위해
  const onSubmit = (e) => {
    e.preventDefault();
    setToDo(""); // input창 입력 후 자동으로 텍스트 지워주는 처리
    if (toDo === "") {
      return;
    }
    setToDos((currentArr) => [...currentArr, toDo]); // 새로운 배열을 리턴해줌
  };

  const onClick = (txt) => setToDos(() => toDos.filter((el) => el !== txt));
  // filter()는 새로운 배열로 반환함. 따라서 state값이 바뀌어 리렌더링 됨.
  // splice()쓰면 원본을 바꾸는거여서 state값이 바뀌지 않아 리렌더링 되지 않음

  return (
    <div className={styles.title}>
      <h1>My Todos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        {/*(e) => onSubmit(e)  이렇게 쓰는거랑 같음.*/}
        <input
          type="text"
          placeholder="Write to do"
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {/*질문1)map의 반환값은 배열인에 어떻게 자동으로 텍스트가 렌더되는지? 
        : 배열이 바로 html로 출력되는게 아니라 jsx파일이기 때문에 jsx파일에 배열이 들어간 후, jsx를 바벨로 트랜스파일러를 통해 출력되게 됨. */}
        {toDos.map((el, index) => (
          <li key={index}>
            {el}
            <button onClick={() => onClick(el)}>x</button>
          </li>
        ))}
        {/*각 리스트에 고유의 프로퍼티 key를 줘야 함 */}
        {/* 질문2) onClick={onClick} 실행시 onClick함수에 매개변수를 넘겨주는 법
            : onClick={onClick(el)} 이렇게 하면 onClick()이 "클릭하기 전에 실행되서 실행된 결과인 "undefined"가 들어감."
            : 따라서 "클릭했을떄 온클릭 함수가 실행"되기 위해 온클릭함수를 익명함수를 통해 써야 함.
            : onClick={()=>onClick(el)} <-클릭시 익명함수가 실행되서 온클릭함수가 실행되게 됨.
       */}
      </ul>
    </div>
  );
}

export default Todolist;
