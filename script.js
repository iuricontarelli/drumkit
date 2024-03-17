"use strict";

// Objeto que mapeia letras do teclado para nomes de arquivos de som
const sons = {
	A: "boom.wav",
	S: "clap.wav",
	D: "hihat.wav",
	F: "kick.wav",
	G: "openhat.wav",
	H: "ride.wav",
	J: "snare.wav",
	K: "tink.wav",
	L: "tom.wav",
};

// Função para criar uma div com texto e adicionar ao container
const criarDiv = (texto) => {
	const div = document.createElement("div");
	div.classList.add("key");
	div.textContent = texto;
	div.id = texto;
	document.getElementById("container").appendChild(div);
};

// Função para exibir as letras do teclado e criar as divs correspondentes
const exibir = (sons) => Object.keys(sons).forEach(criarDiv);

// Função para tocar o som correspondente à letra
const tocarSom = (letra) => {
	const audio = new Audio(`./sounds/${sons[letra]}`);
	audio.play();
};

// Função para adicionar a classe "active" à div correspondente à letra
const adicionarEfeito = (letra) =>
	document.getElementById(letra).classList.toggle("active");

// Função para remover a classe "active" da div correspondente à letra após a transição
const removerEfeito = (letra) => {
	const div = document.getElementById(letra);
	const removeActive = () => div.classList.remove("active");
	div.addEventListener("transitionend", removeActive);
};

// Função para ativar a letra correspondente ao clicar ou pressionar a tecla
const ativarDiv = (evento) => {
	// Determina a letra com base no tipo de evento
	const letra =
		evento.type == "click" ? evento.target.id : evento.key.toUpperCase();

	// Verifica se a letra é permitida (está no objeto sons)
	const letraPermitida = sons.hasOwnProperty(letra);
	if (letraPermitida) {
		// Adiciona o efeito visual de "active" à div da letra
		adicionarEfeito(letra);
		// Toca o som correspondente à letra
		tocarSom(letra);
		// Remove o efeito visual de "active" após a transição
		removerEfeito(letra);
	}
};

// Exibe as divs correspondentes às letras do teclado
exibir(sons);

// Adiciona um ouvinte de evento de clique ao container para ativar a letra ao clicar
document.getElementById("container").addEventListener("click", ativarDiv);

// Adiciona um ouvinte de evento de tecla para ativar a letra ao pressionar uma tecla
window.addEventListener("keyup", ativarDiv);
