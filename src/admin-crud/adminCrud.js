import { useState } from "react";
import Swal from "sweetalert2";

export function Crud() {
  const [tableBollean, setTableBollean] = useState(true);
  const [inputDate, setInputDate] = useState({
    soni: 0,
    like: false,
    id: "",
    nomi: "",
    haqida: "",
    narxi: "",
    chegirma: "",
  });
  const [malumotlar, setMalumotlar] = useState([]);
  const [setable, setmassivtable] = useState([]);
  const [tableFuncBol, setTableBol] = useState(true);

  let tableFunc = () => {
    setTableBol(!tableFuncBol);
  };

  let handleTale = () => {
    setTableBollean(!tableBollean);
    inputClear();
  };

  let handleInput = (e) => {
    setInputDate({
      ...inputDate,
      [e.target.name]: e.target.value,
    });
  };
  let handleRasm = (e) => {
    setInputDate({
      ...inputDate,
      rasm: URL.createObjectURL(e.target.files[0]),
    });
  };

  //--------------------------------------cartFunc-----------------------------------

  function cartFunc(iteam) {
    console.log(iteam);
    if (setable.filter((val) => val.id === iteam.id).length === 0) {
      setmassivtable([...setable, iteam]);
      console.log(setable);
    }
  }

  // -------------------input clear------------------

  function inputClear() {
    setInputDate({
      soni: 0,
      like: false,
      id: "",
      nomi: "",
      haqida: "",
      chegirma: "",
      narxi: "",
    });
  }

  // --------------sendFunc-------------------

  let sendFunc = () => {
    if (inputDate.id === "") {
      setMalumotlar([
        ...malumotlar,
        { ...inputDate, id: new Date().getTime() },
      ]);
      setTableBollean(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "malumot qo'shildi",
        showConfirmButton: false,
        timer: 1500,
      });
      inputClear();
    } else {
      Swal.fire({
        title: "O'zgarishlarni saqlamoqchimisiz?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Saqla",
        denyButtonText: `Saqlama`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setTableBollean(false);
          setMalumotlar(
            malumotlar.map((val) => (val.id === inputDate.id ? inputDate : val))
          );
          inputClear();
          Swal.fire("Saqlandi!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Saqlanmadi", "", "info");
        }
      });
    }
  };

  //------------------ plus minus func ------------------

  let plus = (item) => {
    if (item.soni < 10) {
      setmassivtable(
        setable.map((obj) =>
          obj.id === item.id && obj.soni < 10
            ? { ...obj, soni: obj.soni + 1 }
            : obj
        )
      );
    } else {
      alert("10dan katta son bo'lmaydi");
    }
  };
  let minus = (item) => {
    if (item.soni > 0) {
      setmassivtable(
        setable.map((obj) =>
          obj.id === item.id ? { ...obj, soni: obj.soni - 1 } : obj
        )
      );
    } else {
      alert("0dan kichik son bo'lmaydi");
    }
  };

  // ---------------- remov func --------------
  function remove(id) {
    Swal.fire({
      title: "O'chirmoqchimisiz?",
      text: "Buni qaytara olmaysiz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ha, o'chirib tashlang!",
    }).then((result) => {
      if (result.isConfirmed) {
        setMalumotlar(malumotlar.filter((val) => val.id !== id));
        Swal.fire("O'chirildi!", "Faylingiz o'chirildi.", "success");
      }
    });
  }
  // ------------------reset -------------
  function resetFunc() {
    let res = window.confirm("tozalansinmi");
    if (res) {
      setMalumotlar([]);
    }
  }

  // ------------------edit------------------

  function edit(item) {
    setTableBollean(true);
    setInputDate(item);
  }

  return (
    <>
      <div className="crud">
        <button
          onClick={handleTale}
          style={{ backgroundColor: tableBollean ? "red" : "blue" }}
        >
          {tableBollean ? "Card" : "Form"}
        </button>
        {tableBollean ? (
          <div className="form_oyna">
            <form>
              <input
                type="text"
                placeholder="nomi"
                name="nomi"
                onInput={handleInput}
                value={inputDate?.nomi}
              />
              <input
                type="text"
                placeholder="haqida"
                name="haqida"
                onInput={handleInput}
                value={inputDate?.haqida}
              />
              <input
                type="number"
                placeholder="narxi"
                name="narxi"
                onInput={handleInput}
                value={inputDate?.narxi}
              />
              <input
                type="number"
                placeholder="chegirma"
                name="chegirma"
                onInput={handleInput}
                value={inputDate?.chegirma}
              />
              <input type="file" onInput={handleRasm} />
              <button className="sendBtn" type="button" onClick={sendFunc}>
                {inputDate.id === "" ? "send" : "save"}
              </button>
            </form>
          </div>
        ) : (
          <>
            <button className="table" onClick={tableFunc}>
              {tableFuncBol ? "Table" : "Card"}
            </button>

            <button onClick={resetFunc}>Reset</button>
            {tableFuncBol ? (
              <div className="cards">
                {malumotlar.length > 0 ? (
                  malumotlar.map((iteam, index) => (
                    <div key={index} className="card">
                      <img className="sikleimg" src={iteam.rasm} alt="" />
                      <br />
                      <h2>{iteam.nomi}</h2>
                      <br />
                      <p className="p">Haqida : {iteam.haqida}</p>
                      <br />
                      <p className="p">Narxi : {iteam.narxi}$</p>
                      <br />
                      <p className="p">Chegirma : {iteam.chegirma}%</p>
                      <br />
                      <button className="cart" onClick={() => cartFunc(iteam)}>
                        Add To Cart
                      </button><br />
                      <button
                        className="remove"
                        onClick={() => remove(iteam.id)}
                      >
                        Remove
                      </button>
                      <button className="edit" onClick={() => edit(iteam)}>
                        Edit
                      </button>
                    </div>
                  ))
                ) : (
                  <h1>No data...</h1>
                )}
              </div>
            ) : (
              <>
                <table border={1}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <td>nomi</td>
                      <td>haqida</td>
                      <td>narxi</td>
                      <td>chegirma</td>
                      <td>rasm</td>
                      <td>soni</td>
                    </tr>
                  </thead>
                  <tbody>
                    {setable.length > 0 ? (
                      setable.map((item, index) => (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{item.nomi}</td>
                          <td>{item.haqida}</td>
                          <td>{item.narxi}$</td>
                          <td>{item.chegirma}%</td>
                          <td>
                            <img src={item.rasm} alt="nomi" />
                          </td>
                          <td>
                            <button onClick={() => plus(item)}>plus</button>
                            <br />
                            <span
                              style={{ textAlign: "center", fontSize: "20px" }}
                            >
                              {item.soni}
                            </span>
                            <br />
                            <button onClick={() => minus(item)}>minus</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10} className="no">
                          no date...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
