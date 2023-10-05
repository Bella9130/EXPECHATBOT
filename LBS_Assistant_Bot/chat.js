const API_KEY = "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";

async function getLegalResponse(question) {
  const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Eres una Asistente de una pagina llamado LBS Assistant ofreces ayuda para que las perdonas que ingresen a la pagina de Liceo Bilingüe ",
        },
        {
          role: "user",
          content: question,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Error al hacer la solicitud a la API: ${response.status}`);
  }

  const data = await response.json();

  if (!data.choices || data.choices.length === 0) {
    throw new Error("ERROOOOOORORRORORRO 'choices'.");
  }

  return data.choices[0].message.content;
}

document.querySelector("#generate").addEventListener("click", mostrarCuadros)


const questionInput = document.querySelector("#question");
const generateButton = document.querySelector("#generate");
const chatContainer = document.querySelector("#answer");
const answerOutput = document.querySelector("#chat");

//funcion para mostrar los cuandros
function mostrarCuadros() {
  answerOutput.style.display = "block"
  if (chatContainer.value === "") {
    chatContainer.style.display = "none"
  }else{
    chatContainer.style.display = "block"
  }
}



generateButton.addEventListener("click", async () => {
  if (!questionInput.value) {
    window.alert("Por favor, introduce una pregunta legal.");
    return;
  }

  const question = questionInput.value;

  // Agregar la pregunta del usuario al chat
  chatContainer.innerHTML += `<div class="message user-message">${question}</div>`;

  const response = await getLegalResponse(question);

  // Agregar la respuesta del LBS ASSISTANT
  answerOutput.innerHTML += `<div class="message expert-message">${response}</div>`;

  // Limpiar el campo de entrada
  questionInput.value = "";

  // Hacer que la respuesta más reciente sea visible
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Mostrar la respuesta en el contenedor de respuestas
  answerOutput.innerHTML = response;
});

