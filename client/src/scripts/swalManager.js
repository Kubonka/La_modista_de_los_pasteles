import Swal from "sweetalert2";

function warning(msg) {
  return Swal.fire({
    title: msg,
    icon: "warning",
    showCancelButton: false,
    confirmButtonText: "OK",
  });
}

function success(msg) {
  return Swal.fire({
    title: msg,
    icon: "success",
    showCancelButton: false,
    confirmButtonText: "OK",
  });
}

function error(msg) {
  return Swal.fire({
    title: msg,
    icon: "error",
    showCancelButton: false,
    confirmButtonText: "OK",
  });
}

function question(msg) {
  return Swal.fire({
    title: msg,
    icon: "question",
    showCancelButton: false,
    confirmButtonText: "OK",
  });
}

function info(msg) {
  return Swal.fire({
    title: msg,
    icon: "info",
    showCancelButton: false,
    confirmButtonText: "OK",
  });
}

const swalManager = { warning, success, error, info, question };

export default swalManager;
