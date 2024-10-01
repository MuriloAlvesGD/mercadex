import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    qtd: {
        type: Number,
        required: true,
        default: 0
    },
    avaiable: {
        type: Boolean,
        required: true,
        default: false
    }
})

// Middleware para atualizar 'avaiable' com base em 'qtd'
stockSchema.pre('save', function (next) {
    this.avaiable = this.qtd > 0; // Se qtd for maior que 0, avaiable será true
    next();
});

// Middleware para 'findOneAndUpdate'
stockSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();

    // Atualiza 'avaiable' com base no novo valor de 'qtd'
    if (update.qtd !== undefined) {
        update.avaiable = update.qtd > 0; // Define avaiable baseado em qtd
    }

    next();
});


export default new mongoose.model("Stock", stockSchema);