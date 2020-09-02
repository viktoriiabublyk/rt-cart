export function updateValueAndValidityRecursive(form) {
  if (!form.controls) {
    form.updateValueAndValidity();
    return;
  }

  if (Array.isArray(form.controls)) {
    form.controls.forEach(ctrl => updateValueAndValidityRecursive(ctrl));
    return;
  }

  Object.keys(form.controls).forEach(name => updateValueAndValidityRecursive(form.controls[name]));
}

export function markAsTouchedRecursive(form) {
  if (!form.controls) {
    form.markAsTouched();
    if (!form.dirty) {
      form.markAsDirty();
    }
    return;
  }

  if (Array.isArray(form.controls)) {
    form.controls.forEach(ctrl => markAsTouchedRecursive(ctrl));
    return;
  }

  Object.keys(form.controls).forEach(name => markAsTouchedRecursive(form.controls[name]));
}
