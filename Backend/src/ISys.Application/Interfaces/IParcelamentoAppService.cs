using System;
using System.Collections.Generic;
using ISys.Application.EventSourcedNormalizers;
using ISys.Application.ViewModels;

namespace ISys.Application.Interfaces
{
    public interface IParcelamentoAppService : IDisposable
    { 
        void Register(ParcelamentoViewModel ParcelamentoViewModel);
        IEnumerable<ParcelamentoViewModel> GetAll();
        ParcelamentoViewModel GetById(Guid id);
        ResultParcelamentoOpcoesViewModel GetOpcoes(ParcelamentoOpcoesViewModel ParcelamentoOpcoesViewModel);
        ResultParcelamentoParcelasViewModel GetParcelas(ParcelamentoParcelasViewModel ParcelamentoParcelasViewModel);
        IList<ParcelamentoHistoryData> GetAllHistory(Guid id);
    }
}
