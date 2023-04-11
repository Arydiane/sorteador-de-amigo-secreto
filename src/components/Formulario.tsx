import { useRef, useState } from "react"
import { useAdicionarParticpante } from "../state/hook/useAdicionarParticipante"

const Formulario = () => {

    const [nome, setNome] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const adicionarNaLista = useAdicionarParticpante()

    const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        adicionarNaLista(nome)
        setNome('')
        inputRef.current?.focus()
    }

    return (
        <form onSubmit={adicionarParticipante}>
            <input 
                ref={inputRef}
                value={nome}
                onChange={evento => setNome(evento.target.value)}
                type="text" 
                placeholder="Insira os nomes dos participantes" 
            />
            <button disabled={!nome}>Adicionar</button>
        </form>
    )
}

export default Formulario