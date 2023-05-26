/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    const dataAccount = {name: data.name};
    Account.create(dataAccount, (response) => {
      if (response && response.success === true) {
        App.getModal('createAccount').close();
        this.element.reset();
        App.update();
      }
    })
  }
}