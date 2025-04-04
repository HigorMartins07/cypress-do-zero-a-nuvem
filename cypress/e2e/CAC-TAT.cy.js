/*describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})*/
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() =>{
    cy.visit('./src/index.html') // A página será visitada antes de cada teste
  })

  it('verifica o título da aplicação', () => { //verificar o titulo
    //cy.visit('./src/index.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('verifica o botão submit', () => {
    //cy.visit('./src/index.html')
    cy.get('.button').click()
    cy.get('.error').should('be.visible')  // Aguarda o elemento aparecer
    cy.get('.error').should('contain', 'Valide os campos obrigatórios')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName')
    .should('be.visible')
    .type('Higor')
    .should('have.value', 'Higor') //Preenchimento Nome/sobrenome/email
    
    cy.get('#lastName')
    .should('be.visible')
    .type('Soares')
    .should('have.value', 'Soares') 

    cy.get('#email')
    .should('be.visible')
    .type('higor@gmail.com')
    .should('have.value', 'higor@gmail.com')

    cy.get('#open-text-area')
    .should('be.visible')
    .type('Teste de feedback', {delay:40})
    .should('have.value', 'Teste de feedback') 

    cy.get('.button') // Clique no botão de envio
    .click()

    cy.get('span.success', { timeout: 10000 }) // Espera até 5 segundos
    .should('exist') // Verifica que o elemento existe
    .should('be.visible') 
    .should('contain', 'Mensagem enviada com sucesso.')  
  })

  it('preenche os campos do telefone', () =>{
    cy.get('input#phone')
    .type('9919243')
    .should('have.value', '9919243') //Inserindo letras o teste não exibe e acusa erro
  })

  it('preenche os campos do telefone com letras', () =>{
    cy.get('input#phone')
    .type('ABCDE')
    .should('have.value', '') 
  })

  it ('exibe mensagem de erroquando o e-mail não é valido', ()=>{
    cy.get('#email')
    .type('Higor@exempla,com')
    cy.get('button[type="submit"]').click() //Botão do tipo submit na chamada
    cy.get('.error')
    .should('be.visible')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
    cy.get('#phone-checkbox').check()
    cy.get('.button'). click()
    cy.get('.error').should('be.visible')  // Aguarda o elemento aparecer
    cy.get('.error').should('contain', 'Valide os campos obrigatórios')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .should('be.visible')
    .type('Higor')
    .should('have.value', 'Higor') //Preenchimento Nome/sobrenome/email
    .clear()
    .should('have.value', '')

    cy.get('#lastName')
    .should('be.visible')
    .type('Soares')
    .should('have.value', 'Soares') 
    .clear()
    .should('have.value', '')

    cy.get('#email')
    .should('be.visible')
    .type('higor@gmail.com')
    .should('have.value', 'higor@gmail.com')
    .clear()
    .should('have.value', '')

    cy.get('#open-text-area')
    .should('be.visible')
    .type('Teste de feedback')
    .should('have.value', 'Teste de feedback') 
    .clear()
    .should('have.value', '')
  })

  it('verifica o botão submit utilizando o cy.contains', () => {
    //cy.visit('./src/index.html')
    cy.contains('button', 'Enviar').click()
    cy.contains('strong', 'Valide os campos obrigatórios!').should('be.visible')  // Aguarda o elemento aparecer
    cy.contains('strong', 'Valide os campos obrigatórios!').should('contain', 'Valide os campos obrigatórios')
  })

  //comandos customizados
  it('Utilizando o novo comando fillMandatoryFieldsAndSubmit', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('Utilizando o novo comando fillMandatoryFieldsAndSubmit_comobjeto', () => {
    const data = {
      firstName: 'Higor',
      lastName: 'Martins',
      email: 'higor@gmail.com',
      text: 'Teste de feedback'
    } 

    //na função, chamar o objeto
    cy.fillMandatoryFieldsAndSubmit_comobjeto(data)
    cy.get('.success').should('be.visible')
  })
//Menus suspensos
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube')
    .should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', ()=>{
    cy.get('#product').select('mentoria')
    .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', () =>{
    cy.get('#product').select(1)
    .should('have.value', 'blog')
  })
//Input do tipo radio
  it('marca o tipo de atendimento "Feedback"', () =>{
    cy.get('input[type="radio"]').check('feedback')
    //passar o value ja no seletor
    // cy.get('input[type="radio"] [value="feedback"]').check()
  })

  it('marca o tipo de atendimento "Feedback" com o checked', () =>{
    cy.get('input[type="radio"]').check('feedback')
    .should('be.checked')
  })

  it('marca o tipo de atendimento "elogio" com o checked', () =>{
    cy.get('input[type="radio"]').check('elogio')
    .should('be.checked')
  })

  it('marca o tipo de atendimento "ajuda" com o checked', () =>{
    cy.get('input[type="radio"]').check('ajuda')
    .should('be.checked')
  })

  //Utilizando o each
  it('Marca cada tipo de atendimento', ()=>{
    cy.get('input[type="radio"]') //pego todos os inputs do mesmo tipo
      .each(typeOfService => { //uso o each (cada) e nomeio a função
        cy.wrap(typeOfService) //empacoto (.wrap) a função nomeada anteriormente
        .check() //faço um check para cada objeo contido na função -- no caso typeOfService
        .should('be.checked')
      }
      )
  })

  // marcando CHECKBOX
  it('marca ambos checkboxes, depois desmarca o último', () =>{
    cy.get ('input[type="checkbox"]')
      .each(CheckBox => {
        cy.wrap(CheckBox)
        .check()})
    cy.get ('input[type="checkbox"]')
    .last()
    .uncheck()
  })

  //Fazendo upload de arquivos
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example.json') //pegar o primero input dentro do #file Upload, o primeiro arquivo inserido
    })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a[href="privacy.html"]') //Possivel usar o cy,contains('a', 'Política de privacidade')
    .should('have.attr', 'target', '_blank')
  })

  it('Removendo o target', () => {
    cy.get('a[href="privacy.html"]')
    .invoke('removeAttr', 'target')
    .click()
  })
})