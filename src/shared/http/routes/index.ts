import { Router } from "express";
import usuariosRoutes from "@modules/usuarios/routes/usuarios.routes";
import sessionsRoutes from "@modules/usuarios/routes/sessions.routes";
import produtosRoutes from "@modules/produtos/routes/produtos.routes";

const routes = Router();

routes.use('/usuarios',usuariosRoutes);
routes.use('/sessions',sessionsRoutes);
routes.use('/produtos',produtosRoutes);

/*
routes.get('/', (request, response) => {
    return response.json(
        {
            message: 'Olá GrandCharles'
        }
    );
});
*/

export default routes;
