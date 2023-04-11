import { fireEvent, render, screen } from "@testing-library/react";
import Formulario from "./Formulario";
import { RecoilRoot } from "recoil";
import { act } from "react-dom/test-utils";

describe('o comportamento do Formulario.tsx', () => {
    test('quando o input está vazio novos participantes não podem ser adicionados', () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
        //encontrar no dom o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        //encontrar o botão
        const botao = screen.getByRole('button')
        //garantir que o input esteja no documento
        expect(input).toBeInTheDocument()
        //garantir que o botão esteja desabilitado
        expect(botao).toBeDisabled()
    })
    
    test('adicionar um participante caso exista um nome preenchido', () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
        //encontrar no dom o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        //encontrar o botão
        const botao = screen.getByRole('button')
        //inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Arydiane'
            }
        })
        //clicar no botão de submeter
        fireEvent.click(botao)
        //garantir que o input esteja com o foco ativo
        expect(input).toHaveFocus()
        //garantir que o input não tenha um valor
        expect(input).toHaveValue("")
    })
    
    test('nomes duplicados não podem ser adicionados na lista', () => {
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
        //encontrar no dom o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        //encontrar o botão
        const botao = screen.getByRole('button')
         //inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Arydiane'
            }
        })
        fireEvent.click(botao)
        //inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Arydiane'
            }
        })
        fireEvent.click(botao)
        //encontra a mensagem de erro
        const mensagemDeErro = screen.getByRole('alert')
        //garantir que a mensagem foi recebida
        expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')
    })
    
    test('a mensagem de erro deve sumir após os times', () => {
        jest.useFakeTimers()
        render(
            <RecoilRoot>
                <Formulario />
            </RecoilRoot>)
        //encontrar no dom o input
        const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
        //encontrar o botão
        const botao = screen.getByRole('button')
         //inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Arydiane'
            }
        })
        fireEvent.click(botao)
        //inserir um valor no input
        fireEvent.change(input, {
            target: {
                value: 'Arydiane'
            }
        })
        fireEvent.click(botao)
        //encontra a mensagem de erro
        let mensagemDeErro = screen.queryByRole('alert')
        //garantir que a mensagem foi recebida
        expect(mensagemDeErro).toBeInTheDocument()
        
        //espera N segundos
        act(() => {
            jest.runAllTimers()
        })
    
        //capturar a mensagem de erro
        mensagemDeErro = screen.queryByRole('alert')
        //a mensagem não deve existir
        expect(mensagemDeErro).toBeNull()
    })
})