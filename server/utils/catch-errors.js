const catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch((e) => {
  console.log('\x1b[31m', '\n***** ERROR *****\n', '\x1b[0m', e);

  const messages = e.errors.map?.((err) => err.message) ?? ['Internal Server Error'];

  e.status = e.response?.status ?? 500;

  return res.status(e.status).json({ errors: messages });
});

export default catchErrors;
