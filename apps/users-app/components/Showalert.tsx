import Swal from 'sweetalert2';

// A reusable function for showing alerts
 export const showSwalAlert = (type: "success" | "error", title: string, text: string, footer?: string) => {
  Swal.fire({
    icon: type,
    title: title,
    text: text,
    footer: footer || '', // Optional footer
  });
};
