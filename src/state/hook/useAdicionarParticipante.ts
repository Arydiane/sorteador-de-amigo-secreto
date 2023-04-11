import { useSetRecoilState } from "recoil"
import { listaDeParticipantesState } from "../atom"

export const useAdicionarParticpante = () => {
    const setLista = useSetRecoilState(listaDeParticipantesState)
    return (nomeParticipante: string) => {
        return setLista(listaAtual => [...listaAtual, nomeParticipante])
    }
}