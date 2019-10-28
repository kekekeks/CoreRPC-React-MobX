using System;
using System.Threading.Tasks;
using CoreRPC.AspNetCore;
using Microsoft.AspNetCore.Http;

namespace MiniApp.Rpc
{
    public class RpcBase : IHttpContextAwareRpc
    {
        
        
        protected virtual Task<object> OnRpcCall(HttpContext context, Func<Task<object>> action)
        {
            return action();
        }

        Task<object> IHttpContextAwareRpc.OnExecuteRpcCall(HttpContext context, Func<Task<object>> action)
            => OnRpcCall(context, action);
    }
}