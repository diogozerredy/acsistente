export default class Crianca {
  constructor(nome, dataNascimento, idade) {
    this.id = 0;
    this.nomeCrianca = nome;
    this.dataNascimento = dataNascimento;
    this.idade = idade;
    this.vacinas = []; // Inicializa a lista de vacinas
  }
}
// exemplo de uso
/* const crianca1 = new Crianca("João", 10);
console.log(crianca1); // Exibe o objeto com nome, idade e cpv
 */
