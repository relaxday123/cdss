export const validatePassword = password => {
  if (password.length > 50) return 'Password must be under 50 characters';
  if (!password.match(/^\S*$/)) return 'Spaces are not allowed';
  for (var i = 0; i < password.length; i++) {
    if (
      password[i].match(
        /^[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]$/
      )
    )
      return 'Accented characters are not allowed';
  }
  return '';
};

export const validatePasswordHasVietnameseCharacter = password => {
  for (var i = 0; i < password.length; i++) {
    if (
      password[i].match(
        /^[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]$/
      )
    ) {
      return true;
    }
  }
  return false;
};

export const validateConfPassword = (newPassword, newPasswordConf) => {
  if (newPassword !== newPasswordConf) return 'Password are not matching';
  if (newPassword.length > 50) return 'Password must be under 50 characters';
  if (!newPassword.match(/^\S*$/)) return 'Spaces are not allowed';
  for (var i = 0; i < newPassword.length; i++) {
    if (
      newPassword[i].match(
        /^[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]$/
      )
    )
      return 'Accented characters are not allowed';
  }
  return '';
};
