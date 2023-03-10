import RestaurantDbSource from '../data/restaurantdb-source';
import { createReviewTemplate } from '../views/templates/template-creator';

const FormReviewInitiator = {
  init({ form, container }) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.validateDataForm(form, container);
    });
  },

  validateDataForm(form, container) {
    const data = this.setDataForm(form);
    const error = {
      status: false,
      keys: [],
    };

    for (const key in data) {
      if (data[key] === '') {
        error.status = true;
        error.keys.push(key);
      }
    }

    if (error.status === false) {
      this.sendData({
        data: JSON.stringify(data),
        form,
        container,
      });
    } else {
      this.errorHandler(error, form);
    }
  },

  setDataForm(form) {
    const data = new FormData(form);
    const dataForm = {};

    for (const key of data.keys()) {
      dataForm[key] = data.get(key);
    }
    return dataForm;
  },

  errorHandler(error, form) {
    form.querySelectorAll('span').forEach((item) => {
      item.remove();
    });
    error.keys.forEach((key) => {
      const element = document.querySelector(`#${key}`);
      const errorElement = document.createElement('span');
      errorElement.setAttribute('class', 'input-require');
      errorElement.innerText = `field ${key} must be filled`;
      element.after(errorElement);
    });
  },

  successHandler(form) {
    const formElement = form;
    formElement.querySelectorAll('span').forEach((item) => {
      item.remove();
    });

    formElement.querySelector('input[type=text]').value = '';
    formElement.querySelector('textarea').value = '';
    const messageElement = document.createElement('div');
    messageElement.classList.add('success-message');
    messageElement.classList.add('show-message');
    messageElement.innerHTML = '<p>review added successfully</p>';
    formElement.prepend(messageElement);
    setTimeout(() => {
      messageElement.remove();
    }, 2000);
  },

  async sendData({ data, form, container }) {
    try {
      const response = await RestaurantDbSource.sendReview(data);
      this.successHandler(form);
      container.appendChild(createReviewTemplate(response));
    } catch (err) {
      console.log(err);
    }
  },

};

export default FormReviewInitiator;
