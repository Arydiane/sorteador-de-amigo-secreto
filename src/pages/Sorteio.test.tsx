import { act, fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes"
import Sorteio from "./Sorteio"
import { useResultadoDoSorteio } from "../state/hook/useResultadoDoSorteio"

jest.mock('../state/hook/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})

jest.mock('../state/hook/useResultadoDoSorteio', () => {
    return {
        useResultadoDoSorteio: jest.fn()
    }
})

describe('na página de sorteio', () => {

    const participantes = ['Ana', 'Catarina', 'Arydiane']
    const resultado = new Map([
        ['Ana', 'Arydiane'],
        ['Arydiane', 'Catarina'],
        ['Catarina', 'Ana']
    ])
    
    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
        (useResultadoDoSorteio as jest.Mock).mockReturnValue(resultado);
    })

    test('todos os participantes podem exibir o seu amigo secreto', () => {
        render(<RecoilRoot>
            <Sorteio />
        </RecoilRoot>)

        const opcoes = screen.queryAllByRole('option')
        expect(opcoes).toHaveLength(participantes.length + 1) //porque já vem uma option por padrão
    })

    test('o amigo secreto é exibido quando solicitado', () => {
        render(<RecoilRoot>
            <Sorteio />
        </RecoilRoot>)

        const select = screen.getByPlaceholderText('Selecione o participante')

        fireEvent.change(select, {
            target: {
                value: participantes[0]
            }
        })

        const botao  = screen.getByRole('button')
        fireEvent.click(botao)

        const amigoSecreto = screen.getByRole('alert')
        expect(amigoSecreto).toBeInTheDocument()
    })

    test('esconde o amigo secreto sorteado depois de 5 segundos', async () => {
        jest.useFakeTimers();

        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        )

        const select = screen.getByPlaceholderText('Selecione o participante')
        fireEvent.change(select, { target: { value: participantes[1] } })

        const button = screen.getByRole('button')
        fireEvent.click(button)
        act(() => {
            jest.runAllTimers();
        })
        const alerta = screen.queryByRole('alert')
        expect(alerta).not.toBeInTheDocument()
    })
})