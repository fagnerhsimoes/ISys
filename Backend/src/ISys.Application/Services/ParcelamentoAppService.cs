using System;
using System.Collections.Generic;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using ISys.Application.EventSourcedNormalizers;
using ISys.Application.Interfaces;
using ISys.Application.ViewModels;
using ISys.Domain.Commands;
using ISys.Domain.Core.Bus;
using ISys.Domain.Interfaces;
using ISys.Infra.Data.Repository.EventSourcing;

namespace ISys.Application.Services
{
    public class ParcelamentoAppService : IParcelamentoAppService
    {
        private readonly IMapper _mapper;
        private readonly IParcelamentoRepository _ParcelamentoRepository;
        private readonly IEventStoreRepository _eventStoreRepository;
        private readonly IMediatorHandler Bus;

        public ParcelamentoAppService(IMapper mapper,
                                  IParcelamentoRepository ParcelamentoRepository,
                                  IMediatorHandler bus,
                                  IEventStoreRepository eventStoreRepository)
        {
            _mapper = mapper;
            _ParcelamentoRepository = ParcelamentoRepository;
            Bus = bus;
            _eventStoreRepository = eventStoreRepository;
        }

        public IEnumerable<ParcelamentoViewModel> GetAll()
        {
            return _ParcelamentoRepository.GetAll().ProjectTo<ParcelamentoViewModel>(_mapper.ConfigurationProvider);
        }

        public ParcelamentoViewModel GetById(Guid id)
        {
            return _mapper.Map<ParcelamentoViewModel>(_ParcelamentoRepository.GetById(id));
        }

        public void Register(ParcelamentoViewModel ParcelamentoViewModel)
        {
            var registerCommand = _mapper.Map<RegisterNewRoomCommand>(ParcelamentoViewModel);
            Bus.SendCommand(registerCommand);
        }


        public IList<ParcelamentoHistoryData> GetAllHistory(Guid id)
        {
            return ParcelamentoHistory.ToJavaScriptParcelamentoHistory(_eventStoreRepository.All(id));
        }

        public ResultParcelamentoOpcoesViewModel GetOpcoes(ParcelamentoOpcoesViewModel message)
        {
            var parcelamentoOpcoesCommand = new ParcelamentoOpcoesCommand(message.ValorEntrada,
                                                                          message.ValorTotal,
                                                                          message.MaximoParcelas,
                                                                          message.MinimoParcela);
            Bus.SendCommand(parcelamentoOpcoesCommand);

            var parcelamentoOpcoes = new ResultParcelamentoOpcoesViewModel(message.ValorTotal, message.ValorEntrada);
            var valorParcelar = (message.ValorTotal - message.ValorEntrada);
            var maximoParcelasPossiveis = RetornaMaxParcelasPossivel(message.MaximoParcelas, message.MinimoParcela, valorParcelar);

            for (int i = 0; i < maximoParcelasPossiveis; i++)
            {
                var valorParcela = (valorParcelar / (i + 1));
                var opcao = new ParcelamentoOpcaoViewModel(i + 1, Math.Round(valorParcela, 2));
                parcelamentoOpcoes.AddOpcao(opcao);
            }
            return parcelamentoOpcoes;
        }

        public ResultParcelamentoParcelasViewModel GetParcelas(ParcelamentoParcelasViewModel message)
        {
            var parcelamentoParcelasCommand = new ParcelamentoParcelasCommand(message.QuantidadeParcelas,
                                                                              message.ValorParcela,
                                                                              message.PrimeiroVencimento,
                                                                              message.TipoIntervaloVencimento,
                                                                              message.IntervaloVencimento);
            Bus.SendCommand(parcelamentoParcelasCommand);

            var parcelamentoParcelas = new ResultParcelamentoParcelasViewModel();

            int QtdParcelas = message.QuantidadeParcelas;
            for (int i = 0; i < QtdParcelas; i++)
            {
                var parcela = new ParcelamentoParcelaViewModel((i + 1), message.ValorParcela, message.PrimeiroVencimento, message.TipoIntervaloVencimento, message.IntervaloVencimento);
                parcelamentoParcelas.AddParcela(parcela);
            }
            return parcelamentoParcelas;
        }

        public bool ValidaMinimoParcela(int qtdParcela, decimal minimoParcela, decimal valorParcelar)
        {
            return ((valorParcelar / qtdParcela) >= minimoParcela);
        }

        public int RetornaMaxParcelasPossivel(int maximoParcelas, decimal minimoParcela, decimal valorParcelar)
        {
            if (minimoParcela <= 0)
                return maximoParcelas;

            var maxParcelas = maximoParcelas;
            for (int i = maximoParcelas; i > 0; i--)
            {
                if (ValidaMinimoParcela(i, minimoParcela, valorParcelar))
                {
                    maxParcelas = i;
                    break;
                }
            }
            return maxParcelas;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
