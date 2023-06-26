import "./App.css";
import styled from "@emotion/styled";
import ImagenCripto from "./img/imagen-criptos.jpg";
import Formulario from "./components/Formulario";
import { useEffect, useState } from "react";
import Resultado from "./components/Resultado";
import Cargando from "./components/Cargando";

function App() {
  const Contenedor = styled.div`
    max-width: 1000px;
    margin: 0%, auto;
    width: 100%;
    align-items: center;
    justify-content: center;
    @media (min-width: 992px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2rem;
    }
  `;

  const Imagen = styled.img`
    max-width: 400px;
    width: 80%;
    margin: 100px auto 0 auto;
    display: block;
  `;

  const Heading = styled.h1`
    font-family: "Lato", sans-serif;
    color: #b2c0c1;
    text-align: center;
    font-weight: 700;
    margin-top: 80px;
    margin-bottom: 50px;
    font-size: 34px;

    &::after {
      content: "";
      width: 100px;
      height: 6px;
      background: #b2c0c1;
      display: block;
      margin: 10px auto 0 auto;
    }
  `;

  const [monedas, setMonedas] = useState({});
  const [respuesta, setRespuesta] = useState({});
  const [cargando, setCargando] = useState(false);
  const [imagen, setImagen] = useState(false);

  useEffect(() => {
    setImagen(true);
    if (Object.keys(monedas).length > 0) {
      const cotizar = async () => {
        setCargando(true);
        setRespuesta({});
        const { moneda, cripto } = monedas;
        const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;

        const respuesta = await fetch(URL);
        const resultado = await respuesta.json();

        setRespuesta(resultado.DISPLAY[cripto][moneda]);
        console.log(URL);
        setCargando(false);
        setImagen(false);
      };
      cotizar();
    }
  }, [monedas]);

  return (
    <Contenedor>
      {cargando && <Cargando />}
      {respuesta.PRICE && <Resultado respuesta={respuesta} />}
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMonedas={setMonedas} />
      </div>
      {imagen && (
        <Imagen src={ImagenCripto} alt="Imagen Criptomonedas"></Imagen>
      )}
    </Contenedor>
  );
}

export default App;
