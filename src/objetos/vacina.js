class Vacina {
  constructor(nome, dose, idade, id) {
    this.id = id;
    this.nome = nome;
    this.dose = dose;
    this.idade = idade;
    this.lote = "";
    this.local = "";
    this.tecnico = "";
  }
}
/* 
// Exemplo de uso
const vacina1 = new Vacina("BCG", "12345", "Centro de Saúde", "Dr. Silva");
console.log(vacina1.getDados()); // Exibe os dados da vacina
 */

export default Vacina;
