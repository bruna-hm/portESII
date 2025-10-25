let sobre = {
    nome: "Bruna H. Matsunaga",
    profissao: "Analista de Suporte Jr.",
    formacao: "Estudante de ADS - FATEC-SJC",
    foto: "/static/images/perfil.jpg",
    descricao: "Sou de São José dos Campos - São Paulo, Brasil, tenho 32 anos, sou estudante de Análise e Desenvolvimento de Sistemas na FATEC-Jessen Vidal e formada em História pela UFOP. Sempre busquei me atualizar sobre tecnologia e recentemente comecei a atuar como Suporte Técnico, o que me motivou a continuar na área. Adoro explorar as possibilidades de criação que a tecnologia oferece e descobrir novas formas de utilizá-la.",
    email: "brunaahm@gmail.com",
    redes: [
        { nome: "LinkedIn", link: "https://linkedin.com/in/bruna-hayashi-matsunaga-1b4a71324" },
        { nome: "GitHub", link: "https://github.com/bruna-hm" }
    ]
};

let habilidades = [
    { h: "Python básico" },
    { h: "HTML & CSS básicos" },
    { h: "Bootstrap e Tailwind básicos" },
    { h: "Django e Flask básicos" },
    { h: "Git e Github básicos" },
    { h: "Inglês Avançado" }
];

let certificados = [
    { nome: "Suporte em TI do Google", instituicao: "Coursera", link: "https://coursera.org/share/e9fcc35dcdc1f98cea7a245571832922" },
    { nome: "NDG Linux Essentials", instituicao: "Cisco Networking Academy", link: "/static/files/Ndg.pdf" },
    { nome: "Linux Essentials", instituicao: "LinuxTips", link: "/static/files/Linux_essentials.pdf" },
    { nome: "Python Essentials", instituicao: "LinuxTips", link: "/static/files/Python_essentials.pdf" },
    { nome: "Python Essentials 2", instituicao: "Cisco & Python Institute", link: "/static/files/Cisco_Python2.pdf" }
];

let projetos = [
    { categoria: "Acadêmicos", nome: "EasyScrum", descricao: "Website para ensino do método Scrum, com validação por questionário e certificado.", tecnologias: ["Python", "JavaScript", "HTML", "CSS", "Flask", "AWS", "Apache"], repositorio: "https://github.com/EquipeEcho/EasyScrum", status: "Concluído" },
    { categoria: "Acadêmicos", nome: "botEcho", descricao: "IDE integrada à LLM para auxílio na geração de gráficos com código em Python.", tecnologias: ["Python", "Java", "Ollama"], repositorio: "https://github.com/EquipeEcho/botEcho", status: "Concluído" },
    { categoria: "Acadêmicos", nome: "EchoNova", descricao: "Geração de trilha de treinamento personalizada a partir de formulário e diagnóstico de problemas para empresas.", tecnologias: [], repositorio: "https://github.com/EquipeEcho/EchoNova", status: "Em andamento" },
    { categoria: "Profissionais", nome: "Bloot", descricao: "Ferramenta desenvolvida para praticar programação de scripts em Powershell. Une utilidades de rede, como testes e consultas.", tecnologias: ["Powershell"], repositorio: "https://github.com/bruna-hm/bloot", status: "Concluído" },
    { categoria: "Pessoais", nome: "Alien Invasion Game", descricao: "Jogo desenvolvido a partir do livro Python Crash Course 3ed. para estudo da linguagem, paradigma POO e biblioteca pygame", tecnologias: ["Python", "pygame"], repositorio: "https://github.com/bruna-hm/AlienInvasionGame", status: "Concluído" }
];

module.exports = { sobre, habilidades, certificados, projetos };