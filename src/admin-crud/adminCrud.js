import { useState } from "react";

function Admin() {
  const [malumotlar, setMalumotlar] = useState([
    {
      id: 1,
      nomi: "karam",
      haqida: "gul karam",
      narxi: 35,
      chegirma: 10,
      like: false,
      soni: 0,
    },
    {
      id: 2,
      nomi: "sabzi",
      haqida: "sariq sabzi",
      narxi: 40,
      chegirma: 13,
      like: false,
      soni: 0,
    },
    {
      id: 3,
      nomi: "anjir",
      haqida: "shirin meva",
      narxi: 50,
      chegirma: 15,
      like: false,
      soni: 0,
    },
    {
      id: 4,
      nomi: "limon",
      haqida: "juda nordon",
      narxi: 80,
      chegirma: 8,
      like: false,
      soni: 0,
    },
  ]);
  const [inputData, setInputData] = useState({
    soni: 0,
    like: false,
    id: "",
    nomi: "",
    haqida: "",
    chegirma: "",
    narxi: "",
  });

  function Clear() {
    setInputData({
      soni: 0,
      like: false,
      id: "",
      nomi: "",
      haqida: "",
      chegirma: "",
      narxi: "",
    })
  }

  let inputChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  let rasmFunc = (e) => {
    setInputData({
      ...inputData,
      rasm: URL.createObjectURL(e.target.files[0]),
    });
  };

  // -----------------------sendFunc--------------------

  let sendFunc = (e) => {
    e.preventDefault();

    if (inputData.id === "") {
      setMalumotlar([
        ...malumotlar,
        { ...inputData, id: new Date().getTime() },
      ]);
    } else {
      setMalumotlar(
        malumotlar.map((element) =>
          element.id === inputData.id ? inputData : element
        )
      );
    }

    Clear();
  };

  //----------------deletFunc--------------------

  let deletFunc = (id) => {
    setMalumotlar(malumotlar.filter((val) => val.id !== id));
  };

  //----------------editFunc--------------------

  function editFunc(item) {
    setInputData(item);
    console.log(inputData);
  }

  return (
    <>
      <div className="form_oyna">
        <form className="aboutForm">
          <input
            type="text"
            placeholder="nomi"
            name="nomi"
            onInput={inputChange}
            value={inputData?.nomi}
          />
          <input
            type="text"
            placeholder="haqida"
            name="haqida"
            onInput={inputChange}
            value={inputData?.haqida}
          />
          <input
            type="number"
            placeholder="narxi"
            name="narxi"
            onInput={inputChange}
            value={inputData?.narxi}
          />
          <input
            type="number"
            placeholder="chegrima"
            name="chegirma"
            onInput={inputChange}
            value={inputData?.chegirma}
          />
          <input type="file" onInput={rasmFunc} />
          <button className="sendBtn" type="button" onClick={sendFunc}>
            send
          </button>
        </form>
      </div>

      <table border={1}>
        <thead>
          <tr>
            <th>#</th>
            <th> nomi </th>
            <th> haqida</th>
            <th> narxi </th>
            <th> summa </th>
            <th> chegrima</th>
            <th> rasm</th>
            <th> soni </th>
            <th colSpan={2}> action </th>
          </tr>
        </thead>
        <tbody>
          {malumotlar.length > 0 ? (
            malumotlar.map((item, index) => (
              <tr key={index}>
                <th> {index + 1} </th>
                <td> {item.nomi} </td>
                <td> {item.haqida} </td>
                <td>
                  <del>{item.narxi}$</del>
                  {(item.narxi - (item.narxi / 100) * item.chegirma).toFixed(2)}
                  $
                </td>
                <td>
                  {(
                    (item.narxi - (item.narxi / 100) * item.chegirma) *
                    item.soni
                  ).toFixed(2)}
                  $
                </td>
                <td> {item.chegirma}% </td>
                <td>
                  <img src={item.rasm} alt="nomi" />
                </td>
                <td>
                  <button className="plus">plus</button>
                  <span className="item_soni">{item.soni}</span>
                  <button className="minus">minus</button>
                </td>
                <td>
                  <button
                    style={{ background: "red" }}
                    onClick={() => deletFunc(item.id)}
                  >
                    delete
                  </button>
                </td>
                <td>
                  <button
                    style={{ background: "green" }}
                    onClick={() => editFunc(item)}
                  >
                    edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="no">
                {" "}
                no Data...{" "}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Admin;
