import { Request, Response } from "express"

function changeLanguage(req: Request, res: Response) {
  const lang = req.query.lang as string; 
  
  if (!lang) {
      return res.status(400).json({ msg: "O parâmetro 'lang' é obrigatório na query string (ex: /change?lang=en-US)." });
  }
  
  res.cookie("lang", lang);
  res.json({ lang: lang, msg: `Idioma definido para ${lang}` });
}

export default { changeLanguage }