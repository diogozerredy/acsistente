export default class Crianca {
  constructor(nome, dataNascimento) {
    this.nomeCrianca = nome;
    this.dataNascimento = dataNascimento;
    this.id = 0;
    this.vacinas = []; // Inicializa a lista de vacinas
  }
}
// exemplo de uso
/* const crianca1 = new Crianca("João", 10);
console.log(crianca1); // Exibe o objeto com nome, idade e cpv
 */
