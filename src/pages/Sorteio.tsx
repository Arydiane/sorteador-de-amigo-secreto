import { useState } from "react"
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes"
import { useResultadoDoSorteio } from "../state/hook/useResultadoDoSorteio"
import styles from "./Sorteio.module.scss"
import Card from "../components/Card"

const Sorteio = () => {

    const participantes = useListaDeParticipantes()
    const [participanteDaVez, setParticipanteDaVez] = useState('')
    const [amigoSecreto, setAmigoSecreto] = useState('')
    const resultado = useResultadoDoSorteio()

    const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        if (resultado.has(participanteDaVez)) {
            setAmigoSecreto(resultado.get(participanteDaVez)!)
        }
    }

    return (
        <Card>
            <section className={styles.sorteio}>
                <h2>Quem vai tirar o papelzinho?</h2>
                <form onSubmit={sortear}>
                    <select
                        required
                        name="participanteDaVez" id="participanteDaVez" placeholder="Selecione o seu nome"
                        value={participanteDaVez}
                        onChange={evento => setParticipanteDaVez(evento.target.value)}
                    >
                        <option>Selecione seu nome</option>
                        {participantes.map(participante => <option key={participante}>{participante}</option>)}
                    </select>
                    <p>Clique em em sortear para ver quem é seu amigo secreto!</p>
                    <button className={styles.botao__sortear}>Sortear!</button>
                </form>
                {amigoSecreto && <p role="alert" className={styles.resultado}>{amigoSecreto}</p>}
                <footer className={styles.sorteio}>
                    <img className={styles.aviao} src="/imagens/aviao.png" alt="Um desenho de um avião de papel" />
                </footer>
            </section>
        </Card>

    )
}

export default Sorteio