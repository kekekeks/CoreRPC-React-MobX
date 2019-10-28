using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoreRPC.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace MiniApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            void StaticFiles()
            {
                var devJsRoot = Path.Combine(((PhysicalFileProvider) env.WebRootFileProvider).Root, "..", "webapp");
                if (Directory.Exists(devJsRoot))
                {
                    File.WriteAllText(Path.Combine(devJsRoot, "src", "api.ts"),
                        TsInterop.GenerateTsRpc());
                    var dist = Path.GetFullPath(Path.Combine(devJsRoot, "build"));
                    Directory.CreateDirectory(dist);
                    app.UseStaticFiles(new StaticFileOptions {FileProvider = new PhysicalFileProvider(dist)});
                }

                app.UseStaticFiles(); // for wwwroot
            }
            StaticFiles();
            TsInterop.Register(app);
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
            var notFound = Encoding.UTF8.GetBytes("Not found");
            app.Use((context, next) =>
            {
                if (context.Request.Method.ToUpperInvariant() != "GET"
                    || context.Request.Path
                        .ToString()?
                        .Split('/')
                        .LastOrDefault()?
                        .IndexOf('.') >= 0)
                {
                    context.Response.StatusCode = 404;
                    return context.Response.Body.WriteAsync(notFound, 0, notFound.Length);
                }

                context.Request.Path = "/index.html";
                return next();
            });
            
            StaticFiles();
        }
    }
}