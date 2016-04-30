import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  model() {

    // TODO: Consider fail mechanism

    // return this
    //   .get('ajax')
    //   .request('data/data.json')
    //   .then((response) => {

    //     const funcionarios = Ember.A(response.data).map(
    //       function(funcionario) {

    //         funcionario.fechaNacimiento = funcionario['fecha-nacimiento'];
    //         funcionario.lugarNacimiento = funcionario['lugarNacimiento'];

    //         funcionario.institucionCodigo =
    //           funcionario['institucion'] && funcionario['institucion']['codigo'] ?
    //             funcionario['institucion']['codigo'] : '';

    //         funcionario.institucionSelector =
    //           funcionario['institucion'] && funcionario['institucion']['codigo'] ?
    //             ('pf-' + funcionario['institucion']['codigo']) :
    //             '';

    //         funcionario.fotoFuncionario = funcionario['foto-funcionario'] ?
    //           funcionario['foto-funcionario'] :
    //           'images/magistrados/Congreso/Magistrado.jpg';

    //         funcionario.cargoNombreCompleto =
    //           funcionario['cargo'] && funcionario['cargo']['nombre-completo'] ?
    //             funcionario['cargo']['nombre-completo'] :
    //             'Valor por defecto para \'cargo.nombre-completo\'';

    //         funcionario.cargoNombreCorto =
    //           funcionario['cargo'] && funcionario['cargo']['nombre-corto'] ?
    //             funcionario['cargo']['nombre-corto'] :
    //             'Valor por defecto para \'cargo\'';

    //         funcionario.institucionNombreCompleto =
    //           funcionario['institucion'] && funcionario['institucion']['nombre-completo'] ?
    //             funcionario['institucion']['nombre-completo'] :
    //             'Valor por defecto para \'institucion\'';

    //         return funcionario;
    //       }
    //     );

    //     let instituciones = {};

    //     funcionarios.mapBy('institucion').forEach((e) => {
    //       if (null === e) {
    //         return;
    //       }

    //       e.nombreCorto = e['nombre-corto'];
    //       e.nombreCompleto = e['nombre-completo'];
    //       e.selector = 'pf-' + e['codigo'];

    //       instituciones[e['codigo']] = e;
    //     });

    //     return {
    //       funcionarios: funcionarios,
    //       instituciones: instituciones
    //     };
    //   });

    return this.store.findAll('funcionario');
  }
});
