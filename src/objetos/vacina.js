class Vacina {
  constructor(nome, dose, idade, id, data, local, lote, tecnico) {
    if (id) {
      this.id = id;
    } else if (dose) {
      this.id = `${nome}_${dose}`;
    }
    this.nome = nome;
    this.dose = dose || "UmaDose";
    this.idade = idade || null;
    this.data = data || "";
    this.local = local || "";
    this.lote = lote || "";
    this.tecnico = tecnico || "";
  }
}

/* 
// Exemplo de uso
const vacina1 = new Vacina("BCG", "12345", "Centro de Saúde", "Dr. Silva");
console.log(vacina1.getDados()); // Exibe os dados da vacina
 */

export default Vacina;
