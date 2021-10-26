const Modal = {
    toggle() {
        document.querySelector(".modal-overlay").classList.contains("active") ?
            document.querySelector(".modal-overlay").classList.remove("active") :
            document.querySelector(".modal-overlay").classList.add("active");
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Criação de Website',
        amount: 500000,
        date: '23/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
    {
        id: 4,
        description: 'Salario',
        amount: 400000,
        date: '23/01/2021',
    },
    
]

const Transaction = {
    all: transactions,

    incomes() {
        let income = 0;

        Transaction.all.forEach(transaction => {
            transaction.amount > 0 ? income += transaction.amount : income;
        });

        return income;
    },
    expenses() {
        let expense = 0;

        Transaction.all.forEach(transaction => {
            transaction.amount < 0 ? expense += transaction.amount : expense;
        });

        return expense;
    },
    total() {
        
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);
        
        DOM.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? 'income' : 'expense';

        amount = Utils.formatCurrency(transaction.amount);
        const html = `       
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="Remover transação"></td>
        `

        return html; 
    },

    updateBalance() {
        document.getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes());
        
        document.getElementById('expanseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses());
        
        document.getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total());
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? '-' : '';

        value = String(value).replace(/\D/g, "");
        value = Number(value) / 100;
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        console.log(value);
        return signal + value;
    }
}

transactions.forEach(transaction => {
    DOM.addTransaction(transaction);
});

DOM.updateBalance();