
$(document).ready(function () {

    if (document.getElementById("gridClientes"))
        $('#gridClientes').jtable({
            title: 'Clientes',
            paging: true, 
            pageSize: 5,
            sorting: true,
            defaultSorting: 'Nome ASC',
            actions: {
                listAction: urlClienteList,
            },
            fields: {
                Nome: {
                    title: 'Nome',
                    width: '50%'
                },
                Email: {
                    title: 'Email',
                    width: '35%'
                },
                Alterar: {
                    title: '',
                    display: function (data) {
                        return '<button onclick="window.location.href=\'' + urlAlteracao + '/' + data.record.Id + '\'" class="btn btn-primary btn-sm">Alterar</button>';
                    }
                },
                Excluir: {
                    title: '',
                    display: function (data) {
                        return `<button class="btn btn-danger btn-sm btnExcluirCliente" data-toggle="modal" data-target="#excluiClienteModal" data-id="${data.record.Id}">Excluir</button>`;
                    }
                }
            }
        });

    if (document.getElementById("gridClientes"))
        $('#gridClientes').jtable('load');

    $('#gridClientes').on('click', '.btnExcluirCliente', function () {
        const id = $(this).data('id');
        let random = Math.random().toString().replace('.', '');
        let texto =
            ' <div id="'+ random +'" class="modal fade">                                                                                ' +
            '     <div class="modal-dialog">                                                                                            ' +
            '         <div class="modal-content">                                                                                       ' +
            '             <div class="modal-header">                                                                                    ' +
            '                 <div class="flex-row">                                                                                    ' +
            '                     <h4 class="modal-title">Excluir Cliente</h4>                                                          ' +
            '                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">                          ' +
            '                         <span aria-hidden="true">&times;</span>                                                           ' +
            '                     </button>                                                                                             ' +
            '                 </div>                                                                                                    ' +
            '             </div>                                                                                                        ' +
            '             <div class="modal-body">                                                                                      ' +
            '                 <p>Deseja realmente excluir esse cliente</p>                                                              ' +
            '             </div>                                                                                                        ' +
            '             <div class="modal-footer">                                                                                    ' +
            '                 <div class="w-100 text-center">                                                                           ' +
            '                     <button type="button" class="btn btn-primary btnConfirmaExluir" data-id="'+ id +'">Confirmar</button> ' +
            '                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>                ' +
            '                 </div>                                                                                                    ' +
            '             </div>                                                                                                        ' +
            '         </div>                                                                                                            ' +
            '     </div>                                                                                                                ' +
            ' </div>                                                                                                                    '

        $('body').append(texto);
        $('#' + random).modal('show');

        $('#' + random).on('click','.btnConfirmaExluir', function () {
            $('#' + random).modal('toggle')

            $.ajax({
                url: urlExclusao,
                type: 'POST',
                data: { id: id },
                success: function (result) {
                    ModalDialog("Sucesso", result);

                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                },
                error: function (error) {
                    ModalDialog("Erro", "Erro ao excluir cliente. Detalhes: " + error.responseJSON);
                }
            });
        })
    });
})