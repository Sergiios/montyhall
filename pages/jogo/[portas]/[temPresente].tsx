import styles from "../../../styles/Jogo.module.css";
import { useState, useEffect } from "react";
import Porta from "../../../components/Porta";
import { atualizarPortas, criarPortas } from "../../../functions/portas";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Jogo() {
  const router = useRouter()

  const [portas, setPortas] = useState([]);
  const [valido, setValido] = useState(false);

  useEffect(() => {

    const portas = +router.query.portas;
    const presente = +router.query.temPresente;
    const valido = presente <= portas && presente > 0 && portas > 0;

    setValido(valido)
  }, [portas])

  useEffect(() => {
    const portas = +router.query.portas;
    const presente = +router.query.temPresente;
    setPortas(criarPortas(portas, presente))
  }, [router?.query])
  

  function renderizarPortas() {
    return portas.map((porta) => {
      return (
        <Porta
          key={porta.numero}
          value={porta}
          onChange={(novaPorta) =>
            setPortas(atualizarPortas(portas, novaPorta))
          }
        />
      );
    });
  }

  return (
    <div className={styles.jogo}>
      <div className={styles.portas}>
        {valido ?
          renderizarPortas() :
          <h1>Valores Inválidos.</h1>}
      </div>
      <div className={styles.botoes}>
        <Link href="/">
          <button>Reiniciar o jogo</button>
        </Link>
      </div>
    </div>
  );
}
