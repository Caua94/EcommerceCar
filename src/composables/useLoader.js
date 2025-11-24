
import { ref } from 'vue';


const isLoading = ref(false);

export function useLoader() {
  
  const showLoading = () => {
    isLoading.value = true;
  };

  const hideLoading = () => {
    
    setTimeout(() => {
      isLoading.value = false;
    }, 800); 
  };

  return {
    isLoading,
    showLoading,
    hideLoading
  };
}