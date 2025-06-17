document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
  
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
  
      const formData = new FormData(form);
  
      try {
        const response = await fetch('/submit', {
          method: 'POST',
          body: formData
        });
  
        const message = await response.text();
        showToast(message, response.ok ? 'bg-success' : 'bg-danger');
  
        if (response.ok) {
          form.reset();
          form.classList.remove('was-validated');
        }
      } catch (err) {
        showToast('Submission failed. Try again.', 'bg-danger');
      }
    });
  
    function showToast(message, bgClass) {
      const toastEl = document.getElementById('feedbackToast');
      const toastBody = document.getElementById('toastMessage');
  
      toastBody.textContent = message;
      toastEl.classList.remove('bg-success', 'bg-danger');
      toastEl.classList.add(bgClass);
  
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
    }
  });