
const createUser = catchAsync(async (req, res, next) => {
    const {sessionUser} = req;
    const { name, lastname, email, password } = req.body;
  
    const user = new Users({
      name: name.toLowerCase().trim(),
      lastname: lastname.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      password,
    });
  
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  
    await user.save();
  
    const token = await generateJWT(user.id);

    await user.save();
  
    res.status(201).json({
      status: 'success',
      message: 'El usuario ha sido creado correctamente',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name.charAt(0).toUpperCase() + user.name.slice(1),
        lastname: user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1),
        role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
      },
    });
  });
  