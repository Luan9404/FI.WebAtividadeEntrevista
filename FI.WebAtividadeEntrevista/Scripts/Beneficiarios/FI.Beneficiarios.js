$(document).ready(function () {
    $('#btnIncluirBeneficiario').on('click', function () {
        const cpf = $('#CPFBeneficiario').val().trim();
        const nome = $('#NomeBeneficiario').val().trim();

        if (!cpf || !nome) {
            ModalDialog("Erro", "Preencha todos os campos do beneficiario");
            return;
        }

        var novaLinha = `
            <tr data-id="0">
                <td>${formatarCPF(cpf)}</td>
                <td>${nome}</td>
                <td class="text-center">
                    <button type="button" class="btn btn-sm btn-primary btnAlterarBeneficiario" style="margin-right: 0.4rem">Alterar</button>
                    <button type="button" class="btn btn-sm btn-danger btnExcluirBeneficiario">Excluir</button>
                </td>
            </tr>
        `;

        $('#listaBeneficiarios tbody').append(novaLinha);

        $('#CPFBeneficiario').val('');
        $('#NomeBeneficiario').val('');
    });

    $('#listaBeneficiarios').on('click', '.btnExcluirBeneficiario', function () {
        const linha = $(this).closest('tr');
        const id = parseInt(linha.data('id'));

        if (id > 0) {
            $.ajax({
                url: '/Cliente/DeletarBeneficiario',
                method: 'POST',
                data: { id: id },
                success: function (response) {
                    linha.remove();
                    let random = Math.random().toString().replace('.', '');
                    $('#incluirBeneficiarioModal .modal-dialog').append(`
                        <div id="${random}" class="alert alert-success" style="margin-top:10px;" role="alert">
                          Beneficiario removido com sucesso.
                        </div>
                    `)
                    setTimeout(function () {
                        $('#' + random).alert('close');
                    }, 3000);

                },
                error: function (error) {
                    $('#incluirBeneficiarioModal .modal-dialog').append(`
                        <div id="${random}" class="alert alert-danger" style="margin-top:10px;" role="alert">
                          Erro: ${error.responseJSON}.
                        </div>
                    `)
                    setTimeout(function () {
                        $('#' + random).alert('close');
                    }, 3000);
                }
            });
        } else {
            linha.remove();
        }
    });

    $('#listaBeneficiarios').on('click', '.btnAlterarBeneficiario', function () {
        var linha = $(this).closest('tr');
        var cpfColuna = linha.find('td:eq(0)');
        var nomeColuna = linha.find('td:eq(1)');

        if (linha.hasClass('em-edicao')) {
            var novosValores = linha.find('input').map(function () {
                return $(this).val();
            }).get();

            cpfColuna.text(novosValores[0]);
            nomeColuna.text(novosValores[1]);

            $(this).text('Alterar').removeClass('btn-success');
            linha.removeClass('em-edicao');
        } else {
            cpfColuna.html(`<input id="beneficiario_Alt_CPF" type="text" class="form-control" style="width: 13rem;" value="${cpfColuna.text()}">`);
            nomeColuna.html(`<input type="text" class="form-control" style="width: 150px;" value="${nomeColuna.text()}">`);
            $('#beneficiario_Alt_CPF').mask('000.000.000-00', { reverse: true });

            $(this).text('Salvar').addClass('btn-success');
            linha.addClass('em-edicao');
        }
    });
});